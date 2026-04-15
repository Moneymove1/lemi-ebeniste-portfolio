import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel Serverless Function — Contact Form Handler
 * Receives form data (JSON) and sends email via SendGrid to michel@maitre-ebeniste.com
 */

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const TO_EMAIL = "michel@maitre-ebeniste.com";
const FROM_EMAIL = "noreply@maitre-ebeniste.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, phone, email, projectType, budget, comments, photos } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: "Nom et courriel sont requis." });
    }

    // Build email HTML
    const photoSection = photos && photos.length > 0
      ? `<h3 style="margin-top:24px;color:#1C1C1C;">Photos jointes (${photos.length})</h3>
         <p style="color:#7A756D;">Les photos ont été envoyées en pièces jointes encodées en base64. Voir ci-dessous.</p>
         ${photos.map((p: string, i: number) => `<p><strong>Photo ${i + 1}:</strong> <a href="${p}">Voir la photo</a></p>`).join("")}`
      : "";

    const htmlContent = `
      <div style="font-family:'DM Sans',system-ui,sans-serif;max-width:600px;margin:0 auto;background:#F5F3EE;padding:40px;border-radius:8px;">
        <h1 style="font-size:24px;font-weight:600;color:#1C1C1C;margin-bottom:8px;">Nouvelle demande de soumission</h1>
        <p style="font-size:14px;color:#7A756D;margin-bottom:32px;">Reçue via maitre-ebeniste.com</p>
        
        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #E5E1DA;">
            <td style="padding:14px 0;font-size:13px;font-weight:600;color:#7A756D;text-transform:uppercase;letter-spacing:0.1em;width:140px;vertical-align:top;">Nom complet</td>
            <td style="padding:14px 0;font-size:15px;color:#1C1C1C;">${name}</td>
          </tr>
          <tr style="border-bottom:1px solid #E5E1DA;">
            <td style="padding:14px 0;font-size:13px;font-weight:600;color:#7A756D;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Téléphone</td>
            <td style="padding:14px 0;font-size:15px;color:#1C1C1C;">${phone || "Non spécifié"}</td>
          </tr>
          <tr style="border-bottom:1px solid #E5E1DA;">
            <td style="padding:14px 0;font-size:13px;font-weight:600;color:#7A756D;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Courriel</td>
            <td style="padding:14px 0;font-size:15px;color:#1C1C1C;"><a href="mailto:${email}" style="color:#1C1C1C;">${email}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #E5E1DA;">
            <td style="padding:14px 0;font-size:13px;font-weight:600;color:#7A756D;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Type de projet</td>
            <td style="padding:14px 0;font-size:15px;color:#1C1C1C;">${projectType || "Non spécifié"}</td>
          </tr>
          <tr style="border-bottom:1px solid #E5E1DA;">
            <td style="padding:14px 0;font-size:13px;font-weight:600;color:#7A756D;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Budget</td>
            <td style="padding:14px 0;font-size:15px;color:#1C1C1C;">${budget || "Non spécifié"}</td>
          </tr>
          <tr>
            <td style="padding:14px 0;font-size:13px;font-weight:600;color:#7A756D;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Commentaires</td>
            <td style="padding:14px 0;font-size:15px;color:#1C1C1C;line-height:1.6;">${comments || "Aucun commentaire"}</td>
          </tr>
        </table>

        ${photoSection}

        <div style="margin-top:32px;padding-top:20px;border-top:1px solid #E5E1DA;">
          <p style="font-size:12px;color:#A8A29E;">Ce message a été envoyé depuis le formulaire de contact de maitre-ebeniste.com</p>
        </div>
      </div>
    `;

    // Send via SendGrid API
    const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: TO_EMAIL, name: "Michel Lefebvre" }],
            subject: `Nouvelle soumission de ${name} — ${projectType || "Projet"}`,
          },
        ],
        from: { email: FROM_EMAIL, name: "Maître Ébéniste — Site Web" },
        reply_to: { email: email, name: name },
        content: [
          { type: "text/html", value: htmlContent },
        ],
      }),
    });

    if (sgResponse.ok || sgResponse.status === 202) {
      return res.status(200).json({ success: true, message: "Votre demande a été envoyée avec succès!" });
    } else {
      const errorText = await sgResponse.text();
      console.error("SendGrid error:", sgResponse.status, errorText);
      return res.status(500).json({ error: "Erreur lors de l'envoi. Veuillez réessayer." });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer." });
  }
}

import { Resend } from "resend"

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function sendAuditEmail(data:any) {

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.email,
    subject: "Your PromptLedger AI Spend Audit Report",

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; max-width: 600px; margin: auto;">

        <h2>AI Spend Audit Completed</h2>

        <p>
          Your PromptLedger audit has been successfully generated.
        </p>

        <p>
          Estimated savings identified:
        </p>

        <ul>
          <li>
            <strong>Monthly Savings:</strong>
            $${data.monthlySavings}
          </li>

          <li>
            <strong>Annual Savings:</strong>
            $${data.annualSavings}
          </li>
        </ul>

        ${
          data.monthlySavings >= 500
            ? `
            <div style="margin-top: 20px; padding: 16px; background: #f5f7ff; border-radius: 10px;">

              <h3>High Savings Opportunity</h3>

              <p>
                Your current AI tooling setup shows significant optimization potential.
                Credex may help reduce infrastructure spending further through discounted AI credits.
              </p>

              <a
                href="https://credex.rocks/#contact"
                style="
                  display: inline-block;
                  margin-top: 10px;
                  padding: 10px 16px;
                  background: black;
                  color: white;
                  text-decoration: none;
                  border-radius: 6px;
                "
              >
                Contact Credex
              </a>

            </div>
            `
            : ""
        }

        <p style="margin-top: 24px;">
          Thanks for using PromptLedger.
        </p>

      </div>
    `
  })
  console.log(res)
}
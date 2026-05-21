import { Resend } from "resend"
import { 
AuditEmail,
AffectedAudit
 } from "./types"

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function sendAuditEmail(data: AuditEmail) {

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.email,
    subject: "Your PromptLedger AI Spend Audit Report",

    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          background: #050505;
          color: #ffffff;
          padding: 32px 20px;
        "
      >

        <div
          style="
            max-width: 620px;
            margin: auto;
            background: #111214;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 18px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <div
            style="
              padding: 28px 32px;
              border-bottom: 1px solid rgba(255,255,255,0.08);
              background: linear-gradient(
                180deg,
                rgba(79,110,247,0.12) 0%,
                rgba(17,18,20,1) 100%
              );
            "
          >

            <div
              style="
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 18px;
              "
            >

              <div
                style="
                  width: 40px;
                  height: 40px;
                  border-radius: 12px;
                  background: #4F6EF7;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  color: white;
                  font-size: 18px;
                "
              >
                ▲
              </div>

              <div>
                <p
                  style="
                    margin: 0;
                    font-size: 20px;
                    font-weight: 700;
                    color: white;
                  "
                >
                  PromptLedger
                </p>

                <p
                  style="
                    margin: 4px 0 0;
                    color: rgba(255,255,255,0.5);
                    font-size: 13px;
                  "
                >
                  AI Spend Audit
                </p>
              </div>

            </div>

            <h1
              style="
                margin: 0;
                font-size: 32px;
                line-height: 1.1;
                color: white;
              "
            >
              Your audit report is ready
            </h1>

            <p
              style="
                margin-top: 14px;
                color: rgba(255,255,255,0.68);
                font-size: 15px;
                line-height: 1.7;
              "
            >
              We analyzed your AI tooling stack and identified potential optimization opportunities.
            </p>

          </div>

          <!-- Savings -->
          <div style="padding: 32px;">

            <div
              style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 14px;
                margin-bottom: 26px;
              "
            >

              <div
                style="
                  background: #0A0A0B;
                  border: 1px solid rgba(255,255,255,0.08);
                  border-radius: 14px;
                  padding: 20px;
                "
              >
                <p
                  style="
                    margin: 0 0 8px;
                    font-size: 13px;
                    color: rgba(255,255,255,0.45);
                  "
                >
                  Monthly Savings
                </p>

                <p
                  style="
                    margin: 0;
                    font-size: 28px;
                    font-weight: 700;
                    color: white;
                  "
                >
                  $${data.monthlySavings}
                </p>
              </div>

              <div
                style="
                  background: rgba(16,185,129,0.08);
                  border: 1px solid rgba(16,185,129,0.22);
                  border-radius: 14px;
                  padding: 20px;
                "
              >
                <p
                  style="
                    margin: 0 0 8px;
                    font-size: 13px;
                    color: rgba(255,255,255,0.45);
                  "
                >
                  Annual Savings
                </p>

                <p
                  style="
                    margin: 0;
                    font-size: 28px;
                    font-weight: 700;
                    color: #34d399;
                  "
                >
                  $${data.annualSavings}
                </p>
              </div>

            </div>

            <!-- Audit Link -->
            <div
              style="
                background: #0A0A0B;
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 14px;
                padding: 22px;
                margin-bottom: 24px;
              "
            >

              <p
                style="
                  margin: 0 0 10px;
                  font-size: 15px;
                  font-weight: 600;
                  color: white;
                "
              >
                Your shareable audit report
              </p>

              <p
                style="
                  margin: 0 0 18px;
                  color: rgba(255,255,255,0.55);
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                Use the link below to revisit or share your audit publicly.
              </p>

              <a
                href="${data.auditUrl}"
                style="
                  display: inline-block;
                  padding: 12px 18px;
                  background: #4F6EF7;
                  color: white;
                  text-decoration: none;
                  border-radius: 10px;
                  font-size: 14px;
                  font-weight: 600;
                "
              >
                View Audit Report →
              </a>

              <p
                style="
                  margin-top: 14px;
                  word-break: break-all;
                  color: rgba(255,255,255,0.35);
                  font-size: 12px;
                "
              >
                ${data.auditUrl}
              </p>

            </div>

            ${
              data.monthlySavings >= 500
                ? `
                <div
                  style="
                    padding: 22px;
                    background: rgba(79,110,247,0.08);
                    border: 1px solid rgba(79,110,247,0.22);
                    border-radius: 14px;
                    margin-bottom: 24px;
                  "
                >

                  <h3
                    style="
                      margin: 0 0 12px;
                      color: white;
                      font-size: 20px;
                    "
                  >
                    High Savings Opportunity
                  </h3>

                  <p
                    style="
                      margin: 0;
                      color: rgba(255,255,255,0.68);
                      line-height: 1.7;
                      font-size: 14px;
                    "
                  >
                    Your current AI tooling setup shows significant optimization potential.
                    Credex may help reduce infrastructure spending further through discounted AI credits.
                  </p>

                  <a
                    href="https://credex.rocks/#contact"
                    style="
                      display: inline-block;
                      margin-top: 16px;
                      padding: 12px 18px;
                      background: white;
                      color: black;
                      text-decoration: none;
                      border-radius: 10px;
                      font-size: 14px;
                      font-weight: 600;
                    "
                  >
                    Contact Credex
                  </a>

                </div>
                `
                : ""
            }

            <p
              style="
                margin: 0;
                color: rgba(255,255,255,0.45);
                font-size: 14px;
                line-height: 1.7;
              "
            >
              Thanks for using PromptLedger.
            </p>

          </div>

        </div>

      </div>
    `
  })

  console.log(res)
}

export async function sendReauditEmail(data: AffectedAudit[]){

    const groupedAudits = new Map<string,AffectedAudit[]>()

    for(const audit of data){
        const existing = groupedAudits.get(audit.email)
        if(existing){
            existing.push(audit)
        }else{
            groupedAudits.set(
                audit.email,
                [audit]
            )
        }
    }

    for(const [email,audits] of groupedAudits){
        const auditsHTML = audits.map((audit)=>{
            const changedTools = audit.newAudit.toolResults.flatMap((newTool)=>{
                        const oldTool = audit.oldAudit.toolResults.find((tool)=>tool.currentTool === newTool.currentTool)
                        if(!oldTool){
                            return []
                        }

                        const changed = (oldTool.recommendedTool !== newTool.recommendedTool) ||
                            (oldTool.recommendedPlan !== newTool.recommendedPlan) ||
                            (oldTool.optimizedMonthlySpend !== newTool.optimizedMonthlySpend)

                        if(!changed){
                            return []
                        }

                        return [{
                            oldTool,
                            newTool
                        }]
                    }
                )

            const changedToolsHTML = changedTools.map(({ oldTool,newTool })=>{
                        return `
                            <li style="margin-bottom:16px;">

                                <strong>
                                    ${newTool.currentTool}
                                </strong>

                                <br/>

                                Previous Recommendation:
                                ${oldTool.recommendedTool}
                                (${oldTool.recommendedPlan})

                                <br/>

                                New Recommendation:
                                ${newTool.recommendedTool}
                                (${newTool.recommendedPlan})

                                <br/>

                                Previous Optimized Spend:
                                $${oldTool.optimizedMonthlySpend}

                                <br/>

                                New Optimized Spend:
                                $${newTool.optimizedMonthlySpend}

                            </li>
                        `
                    }
                ).join("")

            return `
                <div
                    style="
                        border:1px solid #e5e7eb;
                        border-radius:12px;
                        padding:20px;
                        margin-bottom:24px;
                    "
                >

                    <h2>
                        Audit ${audit.id}
                    </h2>

                    <p>
                        AI pricing updates affected
                        your stored audit.
                    </p>

                    <p>
                        Previous Monthly Savings:
                        <strong>
                            $${audit.oldAudit.totalMonthlySavings}
                        </strong>
                    </p>

                    <p>
                        New Estimated Monthly Savings:
                        <strong>
                            $${audit.newAudit.totalMonthlySavings}
                        </strong>
                    </p>

                    <h3>
                        What changed
                    </h3>

                    <ul>
                        ${changedToolsHTML}
                    </ul>

                    <a
                        href="${process.env.NEXT_PUBLIC_BASE_URL}/rerun/${audit.id}"
                        style="
                            display:inline-block;
                            margin-top:12px;
                            padding:12px 18px;
                            background:#111827;
                            color:white;
                            text-decoration:none;
                            border-radius:8px;
                        "
                    >
                        Re-run Audit
                    </a>

                </div>
            `
        }).join("")

        await resend.emails.send({

            from:"onboarding@resend.dev",

            to:email,

            subject:
                "Pricing updates affected your AI audit",

            html:`
                <div
                    style="
                        font-family:sans-serif;
                        max-width:700px;
                        margin:auto;
                    "
                >

                    <h1>
                        Pricing changes detected
                    </h1>

                    <p>
                        Some AI pricing updates changed
                        recommendations in your saved audits.
                    </p>

                    ${auditsHTML}

                </div>
            `
        })
    }
}
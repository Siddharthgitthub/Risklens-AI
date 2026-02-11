from fpdf import FPDF

def generate_report(data):

    pdf = FPDF()
    pdf.add_page()

    pdf.set_font("Arial","B",16)
    pdf.cell(0,10,"RiskLens AI Financial Report",ln=True)

    pdf.set_font("Arial","",12)
    pdf.ln(5)

    pdf.cell(0,8,f"Investor Type: {data['investor_type']}",ln=True)
    pdf.cell(0,8,f"Persona: {data['persona']}",ln=True)
    pdf.cell(0,8,f"Risk Score: {data['risk_percent']}%",ln=True)
    pdf.cell(0,8,f"Confidence: {data['confidence']}%",ln=True)
    pdf.cell(0,8,f"Model Accuracy: {data['accuracy']}%",ln=True)

    pdf.ln(8)
    pdf.cell(0,8,"Portfolio Suggestion:",ln=True)

    for p in data["portfolio"]:
        pdf.cell(0,8,f"- {p}",ln=True)

    filename="RiskLens_Report.pdf"
    pdf.output(filename)

    return filename

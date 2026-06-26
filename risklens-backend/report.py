from fpdf import FPDF

def generate_report(data):

    pdf = FPDF()
    pdf.add_page()

    pdf.set_font("Arial","B",18)
    pdf.cell(0,12,"RiskLens AI Report",ln=True)

    pdf.ln(10)

    pdf.set_font("Arial","",12)

    pdf.cell(0,10,f"Profile : {data['profile']}",ln=True)
    pdf.cell(0,10,f"Investor Type : {data['investor_type']}",ln=True)
    pdf.cell(0,10,f"Persona : {data['persona']}",ln=True)
    pdf.cell(0,10,f"Risk : {data['risk_percent']}%",ln=True)
    pdf.cell(0,10,f"Confidence : {data['confidence']}%",ln=True)

    pdf.ln(10)

    pdf.cell(0,10,"Recommended Portfolio",ln=True)

    for k,v in data["portfolio"].items():
        pdf.cell(0,10,f"{k} : {v}%",ln=True)

    filename="RiskLens_Report.pdf"

    pdf.output(filename)

    return filename
const puppeteer = require("puppeteer");

class PDFHandler
{
  constructor()
  {
    this.format = "A4";
    this.path = "./testPDF.pdf";
  }
  async generatePDF(htmlContent)
  {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    // Generar el PDF
    await page.pdf({ path: this.path , format: this.format });

    await browser.close();

  }
}

module.exports = { PDFHandler }
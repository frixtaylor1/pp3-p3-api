const puppeteer = require("puppeteer");

class PDFHandler
{
  constructor()
  {
    this.format = "A4";
    this.path = "./testPDF.pdf";
  }

    /**
     *  Genera un archivo PDF a partir de contenido HTML...
     * 
     * @param string htmlContent       
    **/
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
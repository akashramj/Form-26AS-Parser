const textract = require("textract");

const extractContent = (filePath) => {
  textract.fromFileWithPath(
    filePath,
    { preserveLineBreaks: true },
    (error, text) => {
      if (error) {
        console.error("Error:", error.message);
      } else {
        // Process the extracted text
        const paragraphs = text
          .split("\n")
          .filter((para) => para.trim() !== "");

        // Convert paragraphs into JSON format
        const jsonData = paragraphs.map((para) => ({ content: para }));

        // Output the JSON data
        //console.log(JSON.stringify(jsonData, null, 2));
        jsonString = JSON.stringify(jsonData, null, 2);
        fs.writeFile("./output.json", jsonString, () => {});

        // Displaying data
        //console.log(jsonString);

        let form26asData = {
          pan: null,
          currentStatusOfPan: null,
          financialYear: null,
          assessmentYear: null,
          nameOfAssessee: null,
          addressOfAssessee: null,
          part1: {
            total: {
              srNo1: {
                nameOfDeductor: null,
                tanOfDeductor: null,
                totalAmountPaid: null,
                totalTaxDeducted: null,
                totalTdsDeposited: null,
              },
            },
            transactions: {
              srNo1: {
                section: null,
                transactionDate: null,
                statusOfBooking: null,
                dateOfBooking: null,
                remarks: null,
                amountPaid: null,
                taxDeducted: null,
                tdsDeposited: null,
              },
            },
          },
        };

        // Mapping data
        form26asData.pan = (() => {
          const details = jsonData[2]["content"].split(" ");
          return details[4];
        })();
        form26asData.currentStatusOfPan = (() => {
          const details = jsonData[2]["content"].split(" ");
          return details[9];
        })();
        form26asData.financialYear = (() => {
          const details = jsonData[2]["content"].split(" ");
          return details[12];
        })();
        form26asData.assessmentYear = (() => {
          const details = jsonData[2]["content"].split(" ");
          return details[15];
        })();
        form26asData.nameOfAssessee = (() => {
          const details = jsonData[3]["content"].split(" ");
          return details[3] + " " + details[4] + " " + details[5];
        })();
        form26asData.addressOfAssessee = (() => {
          const details = jsonData[4]["content"].split(" ");
          let resultString = "";
          for (let i = 3; i < details.length; i++) {
            resultString = resultString + details[i] + " ";
          }
          return resultString + jsonData[5]["content"];
        })();
        form26asData.part1.total.srNo1.nameOfDeductor = (() => {
          const details = jsonData[14]["content"].split(" ");
          return (
            details[1] + " " + details[2] + " " + details[3] + " " + details[4]
          );
        })();
        form26asData.part1.total.srNo1.tanOfDeductor = (() => {
          const details = jsonData[14]["content"].split(" ");
          return details[5];
        })();
        form26asData.part1.total.srNo1.totalAmountPaid = (() => {
          const details = jsonData[14]["content"].split(" ");
          return details[6];
        })();
        form26asData.part1.total.srNo1.totalTaxDeducted = (() => {
          const details = jsonData[14]["content"].split(" ");
          return details[7];
        })();
        form26asData.part1.total.srNo1.totalTdsDeposited = (() => {
          const details = jsonData[14]["content"].split(" ");
          return details[8];
        })();
        form26asData.part1.transactions.srNo1.section = (() => {
          const details = jsonData[18]["content"].split(" ");
          return details[1];
        })();
        form26asData.part1.transactions.srNo1.transactionDate = (() => {
          const details = jsonData[18]["content"].split(" ");
          return details[2];
        })();
        form26asData.part1.transactions.srNo1.statusOfBooking = (() => {
          const details = jsonData[18]["content"].split(" ");
          return details[3];
        })();
        form26asData.part1.transactions.srNo1.dateOfBooking = (() => {
          const details = jsonData[18]["content"].split(" ");
          return details[4];
        })();
        form26asData.part1.transactions.srNo1.remarks = (() => {
          const details = jsonData[18]["content"].split(" ");
          return details[5];
        })();
        form26asData.part1.transactions.srNo1.amountPaid = (() => {
          const details = jsonData[18]["content"].split(" ");
          return details[6];
        })();
        form26asData.part1.transactions.srNo1.taxDeducted = (() => {
          const details = jsonData[18]["content"].split(" ");
          return details[7];
        })();
        form26asData.part1.transactions.srNo1.tdsDeposited = (() => {
          const details = jsonData[18]["content"].split(" ");
          return details[8];
        })();
        // Output parsed data
        console.log(form26asData);
        console.log(form26asData.part1);
      }
    }
  );
};

// Usage
const filePath = "./form26ASSource.pdf";
extractContent(filePath);

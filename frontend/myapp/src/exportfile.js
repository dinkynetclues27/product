// import React,{useState} from 'react';
// import axios from 'axios';

// const ExportFile = () => {
//  // const [filename, setFilename] = useState('updated_file.xlsx');
//     const handleExport = async () => {
//         try {
//           const filename = window.prompt("Enter filename:", "updated_file.xlsx");
//           if (!filename) return; 
//           const response = await axios.get('http://localhost:4000/export', { responseType: 'blob' });
//           const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//           const downloadLink = document.createElement('a');
//           downloadLink.href = window.URL.createObjectURL(blob);
//           downloadLink.download = filename;
//           document.body.appendChild(downloadLink);
//           downloadLink.click();
//           document.body.removeChild(downloadLink);
//         } catch (error) {
//           console.error('Error exporting data:', error);
//         }
//       };
    
//       // const handleFilenameChange = (e) => {
//       //   setFilename(e.target.value);
//       // };

//       return (
//         <div className="container mt-5">
//         <form onSubmit={handleExport}>
//             <div className="mb-3">
//                 <h2>Export File</h2>
//             </div>
//             <button type="button" onClick={handleExport} className="btn btn-primary">Export File</button>
//         </form>
//     </div>
//       );

// }

// export default ExportFile;

import React from 'react';
import axios from 'axios';

const ExportFile = () => {

    const handleExport = async () => {
        try {
         const filename = window.prompt("Enter filename:", "updated_file.xlsx");
          if (!filename) return; 

          const response = await axios.get('http://localhost:4000/export', { responseType: 'blob' });
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(blob);
          downloadLink.download = filename;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } catch (error) {
          console.error('Error exporting data:', error);
        }
      };
    
      return (
<div className="container mt-5">
    <form onSubmit={handleExport}>
        <div className="mb-3">
            <h2>Export File</h2>
        </div>
        <button type="button" onClick={handleExport} className="btn btn-primary">Export File</button>
    </form>
</div>
      );

}

export default ExportFile;


import React, { FC } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'components';

interface ExportProps {
   title?: string;
   csvData: Array<object>;
   fileName: string;
   className?: string;
   disabled?: boolean;
   onClick?: any;
}

export const Export: FC<ExportProps> = ({
   title,
   csvData,
   fileName,
   className,
   disabled,
   onClick
}) => {
   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
   const fileExtension = '.xlsx';
   const exportTo = (csvData: Array<object>, fileName: string) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
   }
   const execute = () => {
      if (csvData.length > 0) {
         exportTo(csvData, fileName);
         onClick();
      } else {
         alert('Data can\'t be saved');
      }
   }

   return (
      <Button
         text={title}
         onClick={execute}
         className={className}
         disabled={disabled}
      />
   );
};

Export.defaultProps = {
   title: 'Export'
}

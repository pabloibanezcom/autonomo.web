import { Income } from '@autonomo/common';
import { InvoiceDocument } from 'components/shared';
import { Dialog, IconButton, Tooltip } from 'material';
import { DownloadIcon, FullscreenIcon, PrintIcon } from 'material/icons';
import { useState } from 'react';

type IncomeDocumentGeneratorProps = {
  income: Income;
};

const IncomeDocumentGenerator = ({ income }: IncomeDocumentGeneratorProps) => {
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);

  return (
    <div className="d-flex flex-column align-items-end">
      <InvoiceDocument invoice={income} zoom={0.4} />
      <div className="mt-2">
        <Tooltip title="Print" placement="bottom">
          <IconButton>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download" placement="bottom">
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View in full screen" placement="bottom">
          <IconButton onClick={() => setShowFullScreen(true)}>
            <FullscreenIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog open={showFullScreen} onClose={() => setShowFullScreen(false)}>
        <div>
          <InvoiceDocument invoice={income} zoom={0.5} />
        </div>
      </Dialog>
    </div>
  );
};

export default IncomeDocumentGenerator;

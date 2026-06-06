import { QRCodeCanvas } from 'qrcode.react';
import Button from './Button.jsx';

function QRDisplay({ value, onCopy, checkInPath, copyMessage }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 text-center shadow-soft sm:p-6">
      <div className="mx-auto inline-block rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <QRCodeCanvas value={value} size={280} includeMargin />
      </div>
      <p className="mx-auto mt-4 max-w-md break-all text-sm font-semibold leading-6 text-slate-600">{value}</p>
      {copyMessage ? (
        <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
          {copyMessage}
        </p>
      ) : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button type="button" onClick={onCopy} className="w-full sm:w-auto">
          Copy Link
        </Button>
        <Button to={checkInPath} variant="light" className="w-full sm:w-auto">
          Open Check-in Form
        </Button>
      </div>
    </section>
  );
}

export default QRDisplay;

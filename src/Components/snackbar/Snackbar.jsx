import { useEffect } from "react";
import { useMessageHandling } from "../../context/message-handling";
import "./snackbar.css"
export function Snackbar() {
  const {errorMessage, dismissSnackbar} = useMessageHandling();
  useEffect(()=>{
    setTimeout(dismissSnackbar,5000)
  })
  return (
    <div className="warning-snackbar snackbar snackbar-bottom-center">
      <div className="snackbar-text px-2">{errorMessage}</div>
      <div className="snackbar-actions">
        <button className="snackbar-close btn btn-icon material-icons btn-sm"  onClick={dismissSnackbar}>
          close
        </button>
      </div>
    </div>
  );
}

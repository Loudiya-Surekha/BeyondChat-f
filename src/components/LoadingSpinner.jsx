export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="spinner-container">
      <div className="text-center">
        <div className="spinner-custom mb-3"></div>
        <p className="text-muted">{message}</p>
      </div>
    </div>
  );
}
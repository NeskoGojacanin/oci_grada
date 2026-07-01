function ToastMessage({ message, type }) {
    if (!message) return null;

    return (
        <div className="toast-custom">
            <div className={`alert alert-${type} shadow`}>
                {message}
            </div>
        </div>
    );
}

export default ToastMessage;
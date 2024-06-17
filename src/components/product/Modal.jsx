
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-60" onClick={onClose}></div>
        {/* <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6"> */}
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:w-1/2 py-2 px-6">
            <button onClick={onClose} className="absolute top-0 right-0 mt-3 mr-4 text-2xl">
                &times;
            </button>
            {children}
        </div>
    </div>
    )
}

export default Modal
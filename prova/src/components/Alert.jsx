function Alert({ type, message, onClose }) {
  if (!message) return null

  const style = type === 'error'
    ? 'border-red-200 bg-red-50 text-red-700'
    : 'border-emerald-200 bg-emerald-50 text-emerald-700'

  return (
    <div className={`${style} mb-4 flex items-start justify-between gap-4 rounded-md border px-4 py-3 text-sm`}>
      <span>{message}</span>
      <button
        type="button"
        className="font-medium opacity-70 transition hover:opacity-100"
        onClick={onClose}
      >
        Fechar
      </button>
    </div>
  )
}

export default Alert

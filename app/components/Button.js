export default function Button({ children, onClick, variant = 'primary' }) {
  const styles = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
    success: 'bg-green-600 hover:bg-green-500 text-white',
  }
  return (
    <button onClick={onClick}
      className={`px-6 py-2 rounded-lg font-medium transition ${styles[variant]}`}>
      {children}
    </button>
  )
}
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-slate-800 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  )
}
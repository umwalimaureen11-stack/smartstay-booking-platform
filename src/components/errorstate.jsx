function ErrorState({ message }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Something went wrong
        </h2>
        <p className="text-red-500 text-sm">{message}</p>
      </div>
    </div>
  )
}

export default ErrorState
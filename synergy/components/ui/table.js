export function Table({ children }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">{children}</table>
      </div>
    );
  }
  
  export function TableHead({ children }) {
    return <thead className="bg-gray-100">{children}</thead>;
  }
  
  export function TableRow({ children }) {
    return <tr className="border-b border-gray-200">{children}</tr>;
  }
  
  export function TableCell({ children }) {
    return <td className="p-3 text-center border">{children}</td>;
  }
  
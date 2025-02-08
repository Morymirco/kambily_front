import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border disabled:opacity-50"
      >
        Précédent
      </button>

      {getPageNumbers().map((pageNumber, index) => (
        <motion.button
          key={index}
          onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 rounded-lg ${
            pageNumber === currentPage
              ? 'bg-[#048B9A] text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {pageNumber}
        </motion.button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination; 
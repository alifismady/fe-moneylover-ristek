import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { MdFastfood, MdSavings } from 'react-icons/md'
import { FaCar, FaShoppingCart, FaGamepad, FaMoneyBill } from 'react-icons/fa'

export default function TransactionCard({ transaction }) {
  const formatToRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace('Rp', ' Rp')
  }

  const categoryIcons = {
    'Foods and Beverages': <MdFastfood />,
    Transportation: <FaCar />,
    Shopping: <FaShoppingCart />,
    Entertainment: <FaGamepad />,
    'Other Expenses': <GiPerspectiveDiceSixFacesRandom />,
    'Other Incomes': <GiPerspectiveDiceSixFacesRandom />,
    Salary: <MdSavings />,
    'Incoming Transfers': <FaMoneyBill />,
  }

  return (
    <>
      <div className="bg-white shadow-lg shadow-gray-100 border rounded-2xl p-4 mt-2 dark:bg-slate-700">
        <div className="flex items-center flex-wrap md:flex-nowrap">
          <div className="inline-flex flex-shrink-0 mr-2 justify-center items-center w-12 h-12 text-white bg-black rounded-lg">
            {categoryIcons[transaction.category]}
          </div>
          <div className="flex-grow ml-4 md:ml-0 md:mr-3">
            <span className="text-xl font-bold leading-none text-gray-900 sm:text-xl">
              {transaction.category}
            </span>
            <h3 className="text-base font-normal text-gray-500">
              {transaction.name}
            </h3>
            <h3 className="text-base font-normal text-gray-500">
              {transaction.date.slice(0, 10)} @{transaction.date.slice(11, 16)}
            </h3>
          </div>
          <div className="flex flex-1 justify-end items-center mt-2 md:mt-0 w-full text-base font-bold">
            {transaction.type === 'Expense' ? (
              <div className="flex items-center text-red-500">
                <svg
                  className="w-5 h-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {formatToRupiah(transaction.amount)}
              </div>
            ) : (
              <div className="flex items-center text-green-500">
                {formatToRupiah(transaction.amount)}
                <svg
                  className="w-5 h-5 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div class="bg-white shadow-lg shadow-gray-100 border rounded-2xl p-4 mt-2 dark:bg-slate-700">
        <div class="flex items-center">
          <div class="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg">
            {categoryIcons[transaction.category]}
          </div>
          <div class="flex-shrink-0 ml-3">
            <span class="text-xl font-bold leading-none text-gray-900 sm:text-xl">
              {transaction.category}
            </span>
            <h3 class="text-base font-normal text-gray-500">
              {transaction.name}
            </h3>
            <h3 class="text-base font-normal text-gray-500">
              {transaction.date.slice(0, 10)}
            </h3>
          </div>
          {transaction.type === 'Expense' ? (
            <div class="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-red-500">
              {formatToRupiah(transaction.amount)}
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div class="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
              {formatToRupiah(transaction.amount)}
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </div> */}
    </>
  )
}

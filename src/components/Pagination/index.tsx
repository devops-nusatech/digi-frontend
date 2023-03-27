import * as React from 'react';

interface PaginationProps {
   /**
    * Number shows first element index in pagination
    */
   firstElemIndex: number;
   /**
    * Number shows last element index in pagination
    */
   lastElemIndex: number;
   /**
    * Previous page click handler
    */
   onClickPrevPage: () => void;
   /**
    * Next page click handler
    */
   onClickNextPage: () => void;
   /**
    * Number shows current page index
    */
   page: number;
   /**
    * Value for defining if next page exist or not
    */
   nextPageExists: boolean;
   /**
    * Number shows total amount of elements
    */
   total?: number;
   /**
    * Separator between first and last values
    */
   separator?: string;
   /**
    * Text before total value
    */
   totalText?: string;
}

// interface PreviousIconProps {
//     /**
//      * Value for defining if previous page disabled
//      */
//     disabled: boolean;
// }
// /**
//  * PreviousIcon functional component
//  */
// const PreviousIcon: React.FunctionComponent<PreviousIconProps> = ({ disabled }) => {
//     return (
//         <svg width="22" height="24" viewBox="0 0 22 24" fill="#878D9A" xmlns="http://www.w3.org/2000/svg">
//             <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M14.0545 7.4L12.7782 6L7.30853 12L12.7782 18L14.0545 16.6L9.86105 12L14.0545 7.4Z"
//                 fill={`${disabled ? 'var(--pagination-disabled)' : 'var(--pagination-active)'}`}
//                 fillOpacity={`${disabled ? '0.5' : ''}`}
//             />
//         </svg>
//     );
// };

// interface NextPageIconProps {
//     /**
//      * Value for defining if previous page disabled
//      */
//     disabled: boolean;
// }
/**
 * NextPageIcon functional component
 */
// const NextPageIcon: React.FunctionComponent<NextPageIconProps> = ({ disabled }) => {
//     return (
//         <svg width="23" height="24" viewBox="0 0 23 24" fill="#878D9A" xmlns="http://www.w3.org/2000/svg">
//             <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M8.61279 7.4L9.88905 6L15.3587 12L9.88905 18L8.61279 16.6L12.8062 12L8.61279 7.4Z"
//                 fill={`${disabled ? 'var(--pagination-disabled)' : 'var(--pagination-active)'}`}
//                 fillOpacity={`${disabled ? '0.5' : ''}`}
//             />
//         </svg>
//     );
// };

/**
 * Pagination component helper for tables
 */
class Pagination extends React.Component<PaginationProps> {
   public renderInfoElement = () => {
      const { firstElemIndex, lastElemIndex, separator, total, totalText } =
         this.props;

      if (total) {
         return (
            <p>
               <span>{firstElemIndex}</span>
               <span>{separator || ' - '}</span>
               <span>{lastElemIndex}</span>
               <span>{totalText || ' of '}</span>
               <span>{total}</span>
            </p>
         );
      }

      return (
         <p>
            <span>{firstElemIndex}</span>
            <span>{separator || ' - '}</span>
            <span>{lastElemIndex}</span>
         </p>
      );
   };

   public render() {
      const { page, nextPageExists } = this.props;
      const prevDisabled = page === 0;
      const nextDisabled = !nextPageExists;

      return (
         <div className="flex items-center justify-between">
            {this.renderInfoElement()}
            <div className="space-x-3">
               {/* <button
                     className="pg-history__pagination-prev"
                     onClick={this.onClickPrevPage}
                     disabled={prevDisabled}
                  >
                     <PreviousIcon disabled={prevDisabled}/>
                  </button> */}
               <button
                  onClick={this.onClickPrevPage}
                  disabled={prevDisabled}
                  className={`h-8 w-8 rounded-full bg-primary1 transition-all duration-300 hover:bg-primary2 disabled:cursor-not-allowed disabled:bg-neutral5 disabled:hover:bg-none disabled:dark:bg-neutral3`}>
                  <svg className="h-4 w-4 translate-x-2 rotate-180 fill-neutral8">
                     <use xlinkHref="#icon-arrow-next" />
                  </svg>
               </button>
               <button
                  onClick={this.onClickNextPage}
                  disabled={nextDisabled}
                  className={`h-8 w-8 rounded-full bg-primary1 transition-all duration-300 hover:bg-primary2 disabled:cursor-not-allowed disabled:bg-neutral5 disabled:hover:bg-none disabled:dark:bg-neutral3`}>
                  <svg className="h-4 w-4 translate-x-2 fill-neutral8">
                     <use xlinkHref="#icon-arrow-next" />
                  </svg>
               </button>
               {/* <button
                     className="pg-history__pagination-next"
                     onClick={this.onClickNextPage}
                     disabled={nextDisabled}
                  >
                     <button
                        onClick={this.onClickNextPage}
                        disabled={nextDisabled}
                        className="w-8 h-8 bg-primary1 rounded-full hover:bg-primary2 transition-all duration-300"
                     >
                        <svg className="w-4 h-4 fill-neutral8">
                           <use xlinkHref="#icon-arrow-next" />
                        </svg>
                     </button>
                     <NextPageIcon disabled={nextDisabled}/>
                  </button> */}
            </div>
         </div>
      );
   }

   private onClickPrevPage = () => {
      if (this.props.page === 0) {
         return;
      }
      this.props.onClickPrevPage();
   };

   private onClickNextPage = () => {
      if (!this.props.nextPageExists) {
         return;
      }
      this.props.onClickNextPage();
   };
}

export { Pagination };

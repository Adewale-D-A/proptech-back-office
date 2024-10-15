export default function dateRangeIterator({
  start_date,
  end_date,
}: {
  start_date: string;
  end_date: string;
}) {
  try {
    const startDate = {
      start_year: new Date(start_date || "")?.getFullYear(),
      start_month: new Date(start_date || "")?.getMonth(),
    };
    const endDate = {
      end_year: new Date(end_date || "")?.getFullYear(),
      end_month: new Date(end_date || "")?.getMonth(),
    };
    if (
      start_date &&
      end_date &&
      endDate?.end_year >= startDate?.start_year &&
      endDate?.end_month >= startDate?.start_month
    ) {
      const yearRange = endDate?.end_year - startDate?.start_year;
      if (yearRange === 0) {
        const monthRange = endDate?.end_month + 1 - startDate?.start_month;
        return {
          success: monthRange > 0 ? true : false,
          message:
            monthRange >= 0
              ? "Date range is valid"
              : `Invalid date range, end month must be greater than start month`,
          dataset:
            monthRange > 0
              ? Array.from(
                  { length: monthRange },
                  (_, index) =>
                    new Date(
                      startDate?.start_year,
                      index + startDate?.start_month,
                      1
                    )
                )
              : [new Date(startDate?.start_year, startDate?.start_month, 1)],
        };
      } else {
        const finalDateArray = [] as Date[];
        const startYearDates = Array.from(
          { length: 12 - startDate?.start_month },
          (_, index) =>
            new Date(startDate?.start_year, index + startDate?.start_month, 1)
        );
        finalDateArray.push(...startYearDates);
        for (let i = startDate?.start_year + 1; i < endDate?.end_year; i++) {
          const startYearDates = Array.from(
            { length: 12 },
            (_, index) => new Date(i, index, 1)
          );
          finalDateArray.push(...startYearDates);
        }
        const endYearDates = Array.from(
          { length: endDate?.end_month + 1 },
          (_, index) => new Date(endDate?.end_year, index, 1)
        );
        finalDateArray.push(...endYearDates);
        return {
          success: yearRange >= 0 ? true : false,
          message:
            yearRange >= 0
              ? "Date range is valid"
              : `Invalid date range, end year must be greater than start  year`,
          dataset: finalDateArray,
        };
      }
    } else {
      return {
        success: false,
        message: `Invalid date range, please troubleshoot by checking that your selected end year and month must be greater than start year and month`,
        dataset: [],
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Invalid date range, please troubleshoot by checking that your selected end year and month must be greater than start year and month`,
      dataset: [],
    };
  }
}

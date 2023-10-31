class CountDownGenerator {
  static getCountDownGenerator(startDate, endDate, eventTitle, today) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end - start;
    const eventDuration = diffInMs / (1000 * 60 * 60 * 24) + 1;
    //today.setUTCHours(0, 0, 0);
    start.setUTCHours(0, 0, 0);
    end.setUTCHours(23, 59, 59);

    const difference = start - today;
    const daysUntilEventStarts = Math.floor(difference / (1000 * 60 * 60 * 24));

    let countDownData = {
      title: "",
      day: "",
      days: "",
      showData: true,
    };

    if (start < end) {
      if (
        today < start &&
        daysUntilEventStarts <= 21 &&
        daysUntilEventStarts >= 0
      ) {
        //days left >= 0 && <=21
        if (daysUntilEventStarts > 1) {
          countDownData.title = eventTitle + " begint over";
          countDownData.day = daysUntilEventStarts;
          countDownData.days = "dagen";
        } else if (daysUntilEventStarts === 1) {
          countDownData.title = eventTitle + " begint over";
          countDownData.day = daysUntilEventStarts;
          countDownData.days = "dag";
        } else if (daysUntilEventStarts === 0) {
          countDownData.day = " morgen";
          countDownData.days = "";
          countDownData.title = eventTitle + " begint";
        }
      } else if (today < start && daysUntilEventStarts > 21) {
        //nothing to show - More than 21 days"
        countDownData.title = "More than 21 days until the start";
        countDownData.day = daysUntilEventStarts;
        countDownData.showData = false;
      } else if (today.getTime() > end.getTime()) {
        //nothing to show, kvw finishsed
        countDownData.showData = false;
      } else if (
        today.getTime() <= end.getTime() ||
        today.getTime() >= start.getTime()
      ) {
        //dag 1-eventDuration for Kindervakantie week
        countDownData.title = eventTitle.concat(" is begonnen");

        const diff = end - today;
        const daysLeftUntilEventEnds = Math.floor(diff / (1000 * 60 * 60 * 24));

        let day = "Dag ";
        let dayToday = eventDuration - daysLeftUntilEventEnds;

        if (dayToday < 0 || dayToday > eventDuration) {
          countDownData.showData = false;
        } else {
          countDownData.showData = true;
          countDownData.days = day.concat(dayToday);
        }
      } else {
        //No match found
        countDownData.showData = false;
      }
    } else {
      //error,start > end
      countDownData.days = "";
      countDownData.showData = false;
    }

    return countDownData;
  }
}

export default CountDownGenerator;

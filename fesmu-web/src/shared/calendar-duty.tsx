"use client";

import * as React from "react";
import { Calendar } from "@/shared/ui/calendar";
import { UseFormReturn } from "react-hook-form";

interface CalendarDutyProps {
  disabledDates?: Date[];
  form: UseFormReturn<any>;
  name: string;
}

function CalendarDuty({ disabledDates = [], form, name }: CalendarDutyProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDateDisabled = (date: Date): boolean => {
    const dateWithoutTime = new Date(date);
    dateWithoutTime.setHours(0, 0, 0, 0);

    if (dateWithoutTime < today) {
      return true;
    }

    const isServerDisabled = disabledDates.some((disabledDate) => {
      const disabledDateWithoutTime = new Date(disabledDate);
      disabledDateWithoutTime.setHours(0, 0, 0, 0);
      return dateWithoutTime.getTime() === disabledDateWithoutTime.getTime();
    });

    return isServerDisabled;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && !isDateDisabled(date)) {
      const dateUTC = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      setSelectedDate(dateUTC);
      form.setValue(name, dateUTC);
    }
  };

  React.useEffect(() => {
    const formDate = form.getValues(name);
    if (formDate && typeof formDate === "string") {
      const [day, month, year] = formDate.split(".").map(Number);
      if (day && month && year) {
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          setSelectedDate(date);
          setCurrentMonth(new Date(year, month - 1, 1));
        }
      }
    }
  }, [form, name]);

  return (
    <div className="space-y-4 mt-5">
      <div className="text-sm text-muted-foreground">
        Выберите доступную дату
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        disabled={isDateDisabled}
        className="rounded-lg border shadow-sm"
        classNames={{
          day_outside: "hidden",
          nav: "hidden",
        }}
        fromDate={today}
      />

      {selectedDate && (
        <div className="text-sm">
          Выбрана дата: {selectedDate.toLocaleDateString("ru-RU")}
        </div>
      )}
    </div>
  );
}

export { CalendarDuty };

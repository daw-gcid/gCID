"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale"; // Importa o locale para português (Brasil)
import { Calendar } from "@/src/components/ui/calendar"; // Ajuste o caminho conforme necessário

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date | null) => {
    onChange(date);
    setOpen(false); // Fecha o popover após a seleção
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={ptBR}
          //@ts-ignore
          selected={selected}
          //@ts-ignore
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

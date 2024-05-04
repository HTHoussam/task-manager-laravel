<?php

namespace App\Enums;


enum TaskStatusEnum: int
{
    case PENDING = 0;
    case IN_PROGESS = 1;
    case COMPLETED = 2;
    case OVERDUE = 3;

    public static function getHumanReadable($value): string
    {
        return match ($value) {
            self::PENDING => 'Pending',
            self::IN_PROGESS => 'In progress',
            self::COMPLETED => 'Completed',
            self::OVERDUE => 'Overdue',
        };
    }

    // get html badge using tailwind css
    //     public static function getHtmlBadge($value): string
    //     {
    //         return match ($value) {
    //             self::PENDING => '<span class="bg-yellow-100 text-yellow-600 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded leading-4">Pending</span>',
    //             self::PROCESSING => '<span class="bg-blue-100 text-blue-600 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded leading-4">Processing</span>',
    //             self::PAID => '<span class="bg-green-100 text-green-600 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded leading-4">Paid</span>',
    //             self::INCORRECT => '<span class="bg-red-100 text-red-600 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded leading-4">Incorrect</span>',
    //         };
    //     }
}

<?php

namespace App\Mail;

use App\Models\Booking;
use App\Models\SiteSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingDepositRequest extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking, public ?SiteSetting $settings)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Deposit request for your Easy Blue Divers booking');
    }

    public function content(): Content
    {
        return new Content(view: 'emails.booking-deposit-request');
    }
}

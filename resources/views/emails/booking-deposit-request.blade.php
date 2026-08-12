<h1>Secure your dive booking</h1>

<p>Hello {{ $booking->full_name }},</p>

<p>Thank you for choosing Easy Blue Divers Zanzibar. To secure your <strong>{{ $booking->experience }}</strong> booking for <strong>{{ $booking->slot?->date?->format('D, j M Y') ?: $booking->preferred_date?->format('D, j M Y') }}</strong>, please send a deposit@if($booking->deposit_amount) of <strong>{{ $settings?->payment_currency ?: 'TZS' }} {{ $booking->deposit_amount }}</strong>@endif.</p>

@if($settings?->payment_instructions)
<p><strong>Payment instructions</strong><br>{!! nl2br(e($settings->payment_instructions)) !!}</p>
@endif

@if($settings?->payment_terms)
<p><strong>Booking terms</strong><br>{!! nl2br(e($settings->payment_terms)) !!}</p>
@endif

<p>After payment, please reply with your receipt or payment reference. If you have any questions, reply to this email or contact us on WhatsApp.</p>

<p>Thank you,<br>Easy Blue Divers Zanzibar</p>

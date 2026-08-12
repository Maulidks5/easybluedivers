<h1>We received your booking request</h1>

<p>Hello {{ $booking->full_name }},</p>

<p>
    Thank you for choosing Easy Blue Divers Zanzibar. We have received your request for
    <strong>{{ $booking->experience }}</strong>
    @if ($booking->preferred_date)
        on <strong>{{ $booking->preferred_date->format('D, j M Y') }}</strong>
    @endif
    for <strong>{{ $booking->guests }}</strong> {{ $booking->guests === 1 ? 'guest' : 'guests' }}.
</p>

<p>Our team is now checking availability and the best departure plan. We will contact you shortly by WhatsApp or email with the next step.</p>

<p><strong>No payment is needed until we confirm your booking details.</strong></p>

<p>Kind regards,<br>Easy Blue Divers Zanzibar</p>

<h1>New website enquiry</h1>
<p><strong>Name:</strong> {{ $enquiry->name }}</p>
<p><strong>Email:</strong> {{ $enquiry->email }}</p>
<p><strong>WhatsApp:</strong> {{ $enquiry->whatsapp_number ?: 'Not provided' }}</p>
<p><strong>Subject:</strong> {{ $enquiry->subject }}</p>
<p><strong>Message:</strong></p>
<p>{!! nl2br(e($enquiry->message)) !!}</p>
<p>Open Easy Blue Admin → Enquiries to track this message.</p>

<?php

namespace App\Http\Controllers;

use App\Mail\NewContactEnquiry;
use App\Models\ContactEnquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactEnquiryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $enquiry = ContactEnquiry::create($request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp_number' => ['nullable', 'string', 'max:30'],
            'subject' => ['required', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:3000'],
        ]) + ['status' => 'new']);

        $recipient = config('mail.contact_address');

        if ($recipient) {
            try {
                Mail::to($recipient)->send(new NewContactEnquiry($enquiry));
            } catch (\Throwable $exception) {
                Log::warning('Contact enquiry email could not be sent.', ['enquiry_id' => $enquiry->id, 'error' => $exception->getMessage()]);
            }
        }

        return back()->with('success', 'Thank you. Your message has been sent and our team will reply soon.');
    }
}

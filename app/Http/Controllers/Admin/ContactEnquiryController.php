<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactEnquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactEnquiryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Enquiries', [
            'items' => ContactEnquiry::latest()->get(),
        ]);
    }

    public function update(Request $request, ContactEnquiry $enquiry)
    {
        $enquiry->update($request->validate([
            'status' => ['required', 'in:new,in_progress,closed'],
        ]));

        return back();
    }

    public function destroy(ContactEnquiry $enquiry)
    {
        $enquiry->delete();

        return back();
    }
}

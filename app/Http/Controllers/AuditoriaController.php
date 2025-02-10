<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditoriaController extends Controller
{
    public function index()
    {
        $users = User::all();
        $logs = Audit::orderBy('created_at', 'desc')->get();

        return Inertia::render('Auditoria/Index', [
            'logs' => $logs,
            'users' => $users
        ]);
    }
}

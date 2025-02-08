<?php

namespace App\Http\Controllers;

use App\Models\Colaborador;
use App\Models\Unidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ColaboradorController extends Controller
{
    public function index()
    {
        $colaboradores = Colaborador::with('unidade')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($colaborador) {
                return [
                    'id' => $colaborador->id,
                    'nome' => $colaborador->nome,
                    'email' => $colaborador->email,
                    'cpf' => $colaborador->cpf,
                    'unidade' => $colaborador->unidade->nome_fantasia, //FIXME
                    'created_at' => $colaborador->created_at,
                ];
            });

        return Inertia::render('Colaborador/Index', [
            'colaboradores' => $colaboradores
        ]);
    }

    public function create()
    {
        $unidades = Unidade::where('user_id', Auth::id())->get();
        $userId = Auth::id();

        return Inertia::render('Colaborador/Create', [
            'unidades' => $unidades,
            'userId' => $userId
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'cpf' => 'required|string|max:255',
            'unidade_id' => 'required|exists:unidades,id',
        ]);
        try {
            Colaborador::create([
                'nome' => $validatedData['nome'],
                'email' => $validatedData['email'],
                'cpf' => $validatedData['cpf'],
                'unidade_id' => $validatedData['unidade_id'],
                'user_id' => Auth::id()
            ]);

            return redirect()->route('colaboradores.index')
                ->with('success', 'Colaborador criado com sucesso.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $colaborador = Colaborador::findOrFail($id);
        $unidades = Unidade::where('user_id', Auth::id())->get();

        return Inertia::render('Colaborador/Edit', [
            'colaborador' => $colaborador,
            'unidades' => $unidades
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'cpf' => 'required|string|max:255',
            'unidade_id' => 'required|exists:unidades,id',
        ]);

        $colaborador = Colaborador::findOrFail($id);
        $colaborador->update([
            'nome' => $validatedData['nome'],
            'email' => $validatedData['email'],
            'cpf' => $validatedData['cpf'],
            'unidade_id' => $validatedData['unidade_id'],
        ]);

        return redirect()->route('colaboradores.index')
            ->with('success', 'Colaborador atualizado com sucesso.');
    }

    public function destroy($id)
    {
        $colaborador = Colaborador::findOrFail($id);

        if ($colaborador->user_id !== Auth::id()) {
            abort(403, 'Não autorizado');
        }

        $colaborador->delete();

        return redirect()->route('colaboradores.index')
            ->with('success', 'Colaborador excluído com sucesso.');
    }
}

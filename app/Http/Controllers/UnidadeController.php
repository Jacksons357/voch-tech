<?php

namespace App\Http\Controllers;

use App\Models\Bandeira;
use App\Models\Unidade;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UnidadeController extends Controller
{
    public function index()
    {
        $unidades = Unidade::with('bandeira')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($unidade) {
                return [
                    'id' => $unidade->id,
                    'nome_fantasia' => $unidade->nome_fantasia,
                    'razao_social' => $unidade->razao_social,
                    'cnpj' => $unidade->cnpj,
                    'bandeira' => $unidade->bandeira->nome,
                    'created_at' => $unidade->created_at,
                ];
            });

        return Inertia::render('Unidade/Index', [
            'unidades' => $unidades
        ]);
    }

    public function create()
    {
        $bandeiras = Bandeira::where('user_id', Auth::id())->get();
        $userId = Auth::id();

        return Inertia::render('Unidade/Create', [
            'bandeiras' => $bandeiras,
            'userId' => $userId
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nome_fantasia' => 'required|string|max:255',
            'razao_social' => 'required|string|max:255',
            'cnpj' => 'required|string|max:255',
            'bandeira_id' => 'required|exists:bandeiras,id',
        ]);
        try {
            Unidade::create([
                'nome_fantasia' => $validatedData['nome_fantasia'],
                'razao_social' => $validatedData['razao_social'],
                'cnpj' => $validatedData['cnpj'],
                'bandeira_id' => $validatedData['bandeira_id'],
                'user_id' => Auth::id()
            ]);

            return redirect()->route('unidades.index')
                ->with('success', 'Unidade criada com sucesso.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $unidade = Unidade::findOrFail($id);
        $bandeiras = Bandeira::where('user_id', Auth::id())->get();

        return Inertia::render('Unidade/Edit', [
            'unidade' => $unidade,
            'bandeiras' => $bandeiras
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'bandeira_id' => 'required|exists:bandeiras,id',
            'razao_social' => 'required|string|max:255',
            'nome_fantasia' => 'required|string|max:255',
            'cnpj' => 'required|string|max:255',
        ]);

        $unidade = Unidade::findOrFail($id);
        $unidade->update([
            'bandeira_id' => $validatedData['bandeira_id'],
            'razao_social' => $validatedData['razao_social'],
            'nome_fantasia' => $validatedData['nome_fantasia'],
            'cnpj' => $validatedData['cnpj'],
        ]);

        return redirect()->route('unidades.index')
            ->with('success', 'Bandeira atualizada com sucesso.');
    }

    public function destroy($id)
    {
        $unidade = Unidade::findOrFail($id);

        if ($unidade->user_id !== Auth::id()) {
            abort(403, 'Não autorizado');
        }

        $unidade->delete();

        return redirect()->route('unidades.index')
            ->with('success', 'Bandeira excluída com sucesso.');
    }
}

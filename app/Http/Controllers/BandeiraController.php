<?php

namespace App\Http\Controllers;

use App\Models\Bandeira;
use App\Models\GrupoEconomico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BandeiraController extends Controller
{
    public function index()
    {
        $bandeiras = Bandeira::with('grupoEconomico')
            ->where('user_id', Auth::id())
            ->get()
            ->map(function ($bandeira) {
                return [
                    'id' => $bandeira->id,
                    'nome' => $bandeira->nome,
                    'grupoEconomico' => $bandeira->grupoEconomico->nome,
                    'created_at' => $bandeira->created_at,
                ];
            });

        return Inertia::render('Bandeira/Index', [
            'bandeiras' => $bandeiras
        ]);
    }

    public function create()
    {
        $gruposEconomicos = GrupoEconomico::where('user_id', Auth::id())->get();
        $userId = Auth::id();

        return Inertia::render('Bandeira/Create', [
            'gruposEconomicos' => $gruposEconomicos,
            'userId' => $userId
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'grupo_economico_id' => 'required|exists:grupos_economicos,id',
        ]);
        try {
            Bandeira::create([
                'nome' => $validatedData['nome'],
                'grupo_economico_id' => $validatedData['grupo_economico_id'],
                'user_id' => Auth::id()
            ]);

            return redirect()->route('bandeiras.index')
                ->with('success', 'Bandeira criada com sucesso.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $bandeira = Bandeira::findOrFail($id);
        $gruposEconomicos = GrupoEconomico::where('user_id', Auth::id())->get();

        return Inertia::render('Bandeira/Edit', [
            'bandeira' => $bandeira,
            'gruposEconomicos' => $gruposEconomicos
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'grupo_economico_id' => 'required|exists:grupos_economicos,id',
        ]);

        $bandeira = Bandeira::findOrFail($id);
        $bandeira->update([
            'nome' => $validatedData['nome'],
            'grupo_economico_id' => $validatedData['grupo_economico_id'],
        ]);

        return redirect()->route('bandeiras.index')
            ->with('success', 'Bandeira atualizada com sucesso.');
    }

    public function destroy($id)
    {
        $bandeira = Bandeira::findOrFail($id);

        if ($bandeira->user_id !== Auth::id()) {
            abort(403, 'Não autorizado');
        }

        $bandeira->delete();

        return redirect()->route('bandeiras.index')
            ->with('success', 'Bandeira excluída com sucesso.');
    }
}

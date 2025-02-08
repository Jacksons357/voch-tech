<?php

namespace App\Http\Controllers;

use App\Exports\ColaboradoresExport;
use App\Models\Colaborador;
use App\Models\Unidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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
                    'unidade' => $colaborador->unidade->nome_fantasia,
                    'created_at' => $colaborador->created_at->format('d/m/Y'),
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

    public function relatorio(Request $request)
    {
        $query = Colaborador::with('unidade')->where('user_id', Auth::id());

        if ($request->filled('unidade_id')) {
            $query->where('unidade_id', $request->unidade_id);
        }

        if ($request->filled('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        if ($request->filled('email')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        if ($request->filled('cpf')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        $colaboradores = $query->get()->map(function ($colaborador) {
            return [
                'id' => $colaborador->id,
                'nome' => $colaborador->nome,
                'email' => $colaborador->email,
                'cpf' => $colaborador->cpf,
                'unidade' => $colaborador->unidade->nome_fantasia,
                'created_at' => $colaborador->created_at,
            ];
        });

        $unidades = Unidade::where('user_id', Auth::id())->get();

        return Inertia::render('Relatorios/Colaboradores', [
            'colaboradores' => $colaboradores,
            'unidades' => $unidades,
            'filtros' => $request->all()
        ]);
    }

    public function export(Request $request)
    {
        $query = Colaborador::with('unidade')->where('user_id', Auth::id());

        if ($request->has('unidade_id')) {
            $query->where('unidade_id', $request->unidade_id);
        }
        if ($request->has('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        $colaboradores = $query->get();

        return Excel::download(new ColaboradoresExport($colaboradores), 'colaboradores.xlsx');
    }
}

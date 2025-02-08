<?php

namespace App\Exports;

use App\Models\Colaborador;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ColaboradoresExport implements FromCollection, WithHeadings
{
    protected $colaboradores;

    public function __construct($colaboradores)
    {
        $this->colaboradores = $colaboradores;
    }

    public function collection()
    {
        return $this->colaboradores->map(function ($colaborador) {
            return [
                'Nome' => $colaborador->nome,
                'Email' => $colaborador->email,
                'CPF' => $colaborador->cpf,
                'Unidade' => $colaborador->unidade->nome_fantasia,
                'Data de Criação' => $colaborador->created_at->format('d/m/Y'),
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Nome',
            'Email',
            'CPF',
            'Unidade',
            'Data de Criação',
        ];
    }
}

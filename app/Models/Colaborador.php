<?php

namespace App\Models;

use App\Auditoria;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colaborador extends Model
{
    use Auditoria;
    use HasFactory;

    protected $table = 'colaboradores';

    protected $fillable = [
        'id',
        'nome',
        'email',
        'cpf',
        'unidade_id',
        'user_id'
    ];

    public function unidade()
    {
        return $this->belongsTo((Unidade::class));
    }
}

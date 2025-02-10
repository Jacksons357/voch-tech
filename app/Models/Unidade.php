<?php

namespace App\Models;

use App\Auditoria;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unidade extends Model
{
    use Auditoria;
    use HasFactory;

    protected $table = 'unidades';

    protected $fillable = [
        'id',
        'nome_fantasia',
        'razao_social',
        'cnpj',
        'bandeira_id',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bandeira()
    {
        return $this->belongsTo(Bandeira::class);
    }

    public function colaboradores()
    {
        return $this->hasMany(Colaborador::class);
    }
}

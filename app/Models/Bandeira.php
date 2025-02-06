<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// ID
// Nome
// Grupo Econômico (FK)

class Bandeira extends Model
{
    use HasFactory;

    protected $table = 'bandeiras';

    protected $fillable = [
        'id',
        'nome',
        'grupo_economico_id',
    ];

    public function grupoEconomico()
    {
        return $this->belongsTo((GrupoEconomico::class));
    }

    public function unidade()
    {
        return $this->hasMany(Unidade::class);
    }
}

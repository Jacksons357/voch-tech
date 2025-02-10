<?php

namespace App\Models;

use App\Auditoria;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrupoEconomico extends Model
{
    use Auditoria;
    use HasFactory;

    protected $table = 'grupos_economicos';

    protected $fillable = [
        'nome',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bandeira()
    {
        return $this->hasMany(Bandeira::class);
    }
}

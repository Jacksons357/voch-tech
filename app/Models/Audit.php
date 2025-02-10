<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    protected $table = 'auditoria';

    protected $fillable = ['model', 'model_id', 'acoes', 'dados', 'user_id'];

    public $timestamps = false;
}

<?php

namespace App;

use App\Models\Audit;
use Illuminate\Support\Facades\Auth;

trait Auditoria
{
    public static function bootAuditoria()
    {
        static::created(function ($model) {
            $model->saveAudit('create');
        });

        static::updated(function ($model) {
            $model->saveAudit('update');
        });

        static::deleted(function ($model) {
            $model->saveAudit('delete');
        });
    }

    protected function saveAudit($action)
    {
        Audit::create([
            'model' => get_class($this),
            'model_id' => $this->id,
            'acoes' => $action,
            'dados' => json_encode($this->attributesToArray()),
            'user_id' => Auth::id(),
        ]);
    }
}

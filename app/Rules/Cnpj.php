<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Cnpj implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): void  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $cnpj = preg_replace('/[^0-9]/', '', $value);

        if (strlen($cnpj) != 14) {
            $fail('O CNPJ deve ter 14 dígitos.');
            return;
        }

        $soma1 = 0;
        for ($i = 0, $j = 5; $i < 12; $i++, $j = ($j == 2) ? 9 : $j - 1) {
            $soma1 += $cnpj[$i] * $j;
        }
        $digito1 = ($soma1 % 11) < 2 ? 0 : 11 - ($soma1 % 11);

        if ($cnpj[12] != $digito1) {
            $fail('O CNPJ é inválido.');
            return;
        }

        $soma2 = 0;
        for ($i = 0, $j = 6; $i < 13; $i++, $j = ($j == 2) ? 9 : $j - 1) {
            $soma2 += $cnpj[$i] * $j;
        }
        $digito2 = ($soma2 % 11) < 2 ? 0 : 11 - ($soma2 % 11);

        if ($cnpj[13] != $digito2) {
            $fail('O CNPJ é inválido.');
            return;
        }

        if (count(array_unique(str_split($cnpj))) === 1) {
            $fail('O CNPJ é inválido.');
            return;
        }
    }
}

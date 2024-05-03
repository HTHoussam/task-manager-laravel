<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'tasks' => Task::all(),
            'message' => 'success'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        return response()->json([
            'message' => 'task created successfully',
            'data' => $task,

        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        // if ($task->user_id == auth()->id()) {
        //     return response()->json([
        //         'message' => 'Unauthorized'
        //     ], 401);
        // }
        // return response()->json([
        //     'data' => $task,
        //     'message' => 'task found'
        // ]);

        return Inertia::render('Details', [
            'task' =>  $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return response()->json([
            'message' => 'task updated successfully',
            'data' => $task,

        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        DB::beginTransaction();

        try {
            $task->delete();
            DB::commit();
        } catch (\Throwable $th) {
            info('Error while deleting', [
                'error' => $th->getMessage()
            ]);

            DB::rollBack();
        }

        return response()->noContent();
    }
}

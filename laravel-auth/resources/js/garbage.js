{/* <Dropdown>
<Dropdown.Content>
    <Dropdown.Link href={route("profile.edit")}>
        Profile
    </Dropdown.Link>
    <Dropdown.Link
        href={route("logout")}
        method="post"
        as="button"
    >
        Log Out
    </Dropdown.Link>
</Dropdown.Content>
</Dropdown>

<ResponsiveNavLink
method="post"
href={route("logout")}
as="button"
>
Log Out
</ResponsiveNavLink> */}

<main>{children}</main>

background: url('https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80');


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

                            {/* <Paragraph>
                                <Link
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </Link>
                            </Paragraph> */}

// # DB_CONNECTION=pgsql
// # DB_HOST=localhost
// # DB_PORT=5432
// # DB_DATABASE=laravel-auth
// # DB_USERNAME=SatoruF
// # DB_PASSWORD=5352

// <?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class userData extends Model
// {
//     use HasFactory;
//     protected $table = 'userData';
// }


// <?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\userData;
// use Inertia\Inertia;
// use Inertia\Response;

// class UserDataController extends Controller
// {
    // public function store(Request $request)
    // {
    //     // Validate the form input
    //     $validatedData = $request->validate([
    //         'client_id' => 'integer',
    //         'client_name' => 'string|max:255',
    //         'title' => 'string|max:255',
    //         'message' => 'integer|min:1',
    //     ]);
    
    //     // Save the form data to the database
    //     $UserData = new userData();
    //     $UserData->client_id = $validatedData['client_id'];
    //     $UserData->client_name = $validatedData['client_name'];
    //     $UserData->title = $validatedData['title'];
    //     $UserData->message = $validatedData['message'];
    //     $UserData->save();
    
    //     // Redirect the user back to the dashboard with a success message
    //     return redirect()->route('dashboard')->with('success', 'User$UserData added successfully!');
    // }
// }


// <?php

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration
// {
//     /**
//      * Run the migrations.
//      */
//     public function up(): void
//     {
//         Schema::create('userData', function (Blueprint $table) {
            // $table->id();
            // $table->integer('client_id');
            // $table->string('client_name');
            // $table->string('client_email');
            // $table->string('title');
            // $table->text('message');
            // $table->text('file_link');
            // $table->timestamps();
//         });
//     }

//     /**
//      * Reverse the migrations.
//      */
//     public function down(): void
//     {
//         Schema::dropIfExists('userData');
//     }
// };


                                {/* <Link
                                    href={route("profile.edit")}
                                    onClick={showDrawer}
                                >
                                    Edit profile
                                </Link> */}


                                        // Validate the form input
        // $validatedData = $request->validate([
        //     'client_name' => 'string|max:255',
        //     'client_email' => 'string|max:255',
        //     'title' => 'string|max:255',
        //     'message' => 'string',
        //     'file_link' => 'string|max:255',
        // ]);
    
        // // Save the form data to the database
        // $UserData = new UserData();
        // $UserData->client_id = $request->input('client_id');
        // $UserData->client_name = $validatedData['client_name'];
        // $UserData->client_email = $validatedData['client_email'];
        // $UserData->title = $validatedData['title'];
        // $UserData->message = $validatedData['message'];
        // $UserData->file_link = $validatedData['file_link'];
        // $UserData->save();
    
        // // Redirect the user back to the dashboard with a success message
        // return redirect()->route('dashboard')->with('success', 'User$UserData added successfully!');



    //Route::get('/dashboard/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');


            // <AuthenticatedLayout
        //     showDrawer={showDrawer}
        //     user={auth.user}
        //     header={<h2>Profile</h2>}
        // >
        //     <Head title="Profile" />
                // </AuthenticatedLayout>


                                                {/* <Link
                                    //href={route("profile.edit")}
                                    href={route("dashboard")}
                                    onClick={showDrawer}
                                >
                                    Edit profile
                                </Link> */}
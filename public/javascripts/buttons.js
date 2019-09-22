(
    function(){
        let App = window.App || {};

        function Buttons() {

        }
        Buttons.prototype.start = function () {
            //trigger all buttons functionality

            $("body").on('click', "button[buttonAction='login']", function () {
                $.get("users/cookie", function() {
                    location.reload();
                });
            });

            $("body").on('click', "button[buttonAction='logout']", function () {
                $.removeCookie('user_id');
                location.reload();
            });

            $("body").on('mouseenter', "[blockName='unfollow_button']", function() {
                $(this).removeClass("btn-success").addClass("btn-danger").text("Unfollow");
            });

            $("body").on('mouseleave', "[blockName='unfollow_button']", function() {
                $(this).removeClass("btn-danger").addClass("btn-success").text("Following");
            });

            $("body").on('click',"[blockName='unfollow_button']", function () {
                let id_user = $(this).attr("id_follow");
                let body = {unfollow: id_user};

                $.post( "users/unfollow", body)
                    .done(function( output, status, xhr ) {
                        let row = $("[id_follow=" + id_user + "]").closest("[blockName='tableRow']");
                        $(row).find("[blockName='follower_number']")
                            .text(output.follower_number);
                        $(row).find("[blockName='unfollow_button']")
                            .attr("blockName", "follow_button")
                            .text("Follow")
                            .addClass("btn-warning")
                            .removeClass("btn-success btn-danger");
                    })
                    .fail(function() {
                        alert("Unfollow request failed");
                    });;
            });

            $("body").on('click', "[blockName='follow_button']", function () {
                let id_user = $(this).attr("id_follow");
                let body = {follow: id_user};


                $.post( "users/follow", body)
                    .done(function( output, status, xhr ) {
                        let row = $("[id_follow=" + id_user + "]").closest("[blockName='tableRow']");
                        $(row).find("[blockName='follower_number']")
                            .text(output.follower_number);
                        $(row).find("[blockName='follow_button']")
                            .attr("blockName", "unfollow_button")
                            .text("Unfollow")
                            .addClass("btn-danger")
                            .removeClass("btn-warning");
                    })
                    .fail(function() {
                        alert("Follow request failed");
                    });
            });
        }



        App.Buttons = Buttons;
        window.App = App;
    }
)()

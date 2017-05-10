(** C3 demo *)

open Lwt

let timeseries () =
  let kind = `Line in
  C3.Line.make ~kind:`Timeseries ~x_format:"%m/%d" ()
  |> C3.Line.add
    ~segment:(C3.Segment.make ~kind ~label:"Example"
                ~points:[1494082410., 0.1;
                         1494168810., 0.2;
                         1494255210., 0.3;
                         1494341610., 0.2;
                         1494428010., 0.1] ())
  |> C3.Line.render ~bindto:"#timeseries"
  |> ignore

let _ =
  Dom_html.window##.onload := Dom_html.handler begin fun _ ->
      timeseries () ;
      Js._true
    end

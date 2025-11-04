import { Archive, Pencil } from "lucide-react";
import type { ReactElement } from "react";
import Button from "./Button";


interface cardProps {
  id:string
  title: string;
  titleIcon: ReactElement;
  type?: string;
  link: string;
  time?: string;
  tags?: { item: string }[];
  handleDelete?: (id:string) => void;
  handleUpdateOpen?:(id:string)=>void;
}

export default function Card(props:cardProps){

    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-4 max-w-[410px]  sm:max-w-[360px]  text-black/70 flex flex-col gap-4  justify-between h-[400px] sm:h-[420px] overflow-y-auto w-full">
        <div className="flex flex-row justify-between items-center px-1 w-full">
          <div className= "flex flex-row gap-2 items-center ">
            <div className= " text-gray-600  ">{props.titleIcon}</div>
            <span className="text-black/80  text-lg font-semibold ">
              {props.title}
            </span>
          </div>
          <div className="flex flex-row  items-center text-gray-400 ">
            {props.handleUpdateOpen &&
            (<Button
              startIcon={<Pencil />}
              variant="secondary"
              size="sm"
              text=""
              className="focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none bg-white text-gray-500/80 p-1 "
              onClick={() => props.handleUpdateOpen?.(props.id)}
            />)}
            {props.handleUpdateOpen &&
            (<Button
              startIcon={<Archive />}
              variant="secondary"
              size="sm"
              text=""
              className="focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none bg-white text-gray-500/80 p-1"
              onClick={() => props.handleDelete?.(props.id)}
            />)}
          </div>
        </div>
        {/* links or Content  */}
        <div className="overflow-y-auto w-full rounded-xl focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none">
          {props.type === "youtube" && (
            <div className="rounded-xl focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none">
              <iframe
                src={props.link && props.link.replace("watch?v=", "embed/")}
                title="YouTube video player"
                className="w-full h-auto rounded-xl focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {props.type === "image" && (
            <div className=" w-full overflow-y-auto rounded-xl focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none">
              <img
                src={`${props.link}`}
                alt={props.title}
                className="w-full rounded-xl object-center focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none"
              />
            </div>
          )}
          {props.type === "twitter" && (
            <div className=" overflow-y-auto  rounded-xl focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none">
              <blockquote className="twitter-tweet focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none">
                <a
                  href={
                    props.link && props.link.replace("x.com", "twitter.com")
                  }
                ></a>
              </blockquote>
            </div>
          )}
        </div>

        {/* tags */}
        <div className="flex flex-row  gap-2">
          {props.tags &&
            props.tags.map((item, index) => (
              <Button
                key={index}
                text={`${item}`}
                variant="secondary"
                size="sm"
                className="rounded"
              ></Button>
            ))}
        </div>
        <span className="text-gray-400 text-start text-xs"><b>Added on</b> {props.time &&  props.time.split(" ").slice(0,5).join(" ")}</span>
      </div>
    );
}